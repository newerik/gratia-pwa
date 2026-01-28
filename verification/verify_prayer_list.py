from playwright.sync_api import sync_playwright, expect

def verify_prayer_list(page):
    page.on("console", lambda msg: print(f"Console: {msg.text}"))
    page.on("pageerror", lambda err: print(f"Page Error: {err}"))

    # Navigate and clear storage
    page.goto("http://localhost:5173/prayer-list")
    page.evaluate("localStorage.clear()")
    page.reload()

    # Wait for page to load
    page.wait_for_load_state("domcontentloaded")

    # Add an item
    input_field = page.get_by_placeholder("Add a new prayer item...")
    expect(input_field).to_be_visible(timeout=10000)

    input_field.fill("My First Prayer")
    page.get_by_role("button", name="Add item").click()

    input_field.fill("My Second Prayer")
    page.get_by_role("button", name="Add item").click()

    # Verify items are added
    # Since they are multiline inputs (textareas), get_by_text works
    expect(page.get_by_text("My First Prayer")).to_be_visible()
    expect(page.get_by_text("My Second Prayer")).to_be_visible()

    # Archive "My First Prayer"
    print("Clicking checkbox for My First Prayer...")

    # Filter for the row containing the text
    # MuiPaper-root is the container for the item
    item_row = page.locator(".MuiPaper-root").filter(has=page.get_by_text("My First Prayer"))

    # Click the checkbox inside that row
    item_row.get_by_role("checkbox").click()

    # Wait for it to disappear
    print("Waiting for item to disappear...")
    expect(page.get_by_text("My First Prayer")).not_to_be_visible()

    # Click "Show archived items"
    page.get_by_role("button", name="Show archived items").click()

    # Verify "Archived Items" view
    expect(page.get_by_text("Archived Items")).to_be_visible()
    expect(page.get_by_text("My First Prayer")).to_be_visible()

    # Take screenshot
    page.screenshot(path="verification/prayer_list_verified.png")

if __name__ == "__main__":
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            verify_prayer_list(page)
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()
