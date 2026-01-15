import Client from "ssh2-sftp-client";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config();

const config = {
  host: process.env.SFTP_HOST,
  port: parseInt(process.env.SFTP_PORT || "22"),
  username: process.env.SFTP_USERNAME,
  password: process.env.SFTP_PASSWORD,
};

const localPath = path.resolve(import.meta.dirname!, "../dist");
const remotePath = process.env.SFTP_REMOTE_PATH || "/";

async function run() {
  const sftp = new Client();

  if (!fs.existsSync(localPath)) {
    console.error(`Build folder not found: ${localPath}`);
    console.error('Please run "pnpm build" first.');
    process.exit(1);
  }

  try {
    console.log(`Connecting to ${config.host}...`);
    await sftp.connect(config);
    console.log("Connected.");

    // Clean remote directory first (removes all old files)
    console.log(`Cleaning remote directory: ${remotePath}`);
    const items = await sftp.list(remotePath);
    for (const item of items) {
      const itemPath =
        remotePath === "/" ? `/${item.name}` : `${remotePath}/${item.name}`;
      if (item.type === "d") {
        await sftp.rmdir(itemPath, true);
      } else {
        await sftp.delete(itemPath);
      }
    }

    // Upload fresh
    console.log(`Uploading files from dist to ${remotePath}...`);
    await sftp.uploadDir(localPath, remotePath, {
      filter: (filePath) => path.basename(filePath) !== ".DS_Store",
    });

    console.log("Upload complete!");
  } catch (err) {
    console.error("Deployment failed:", err);
    process.exit(1);
  } finally {
    await sftp.end();
  }
}

run();
