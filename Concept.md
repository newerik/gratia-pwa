# Concept

I have created this PWA React app for the purpose of creating a gratitude journal, what people can use to write what they are grateful on that day.
I don't have a server, so I want to use Google Drive to store the data if possible. The user can use the app without logging in, but then the data will not be synced with Google Drive. If the user is not logged in, the icon should be a generic user icon. If the user is logged in, the icon should be the user's profile picture.
I have no idea how to implement this, so I need your help. Please write an MD file for me if I need to register my app somehow in Google's system.

## Mobile first

It should be mobile first, but should be working on desktop as well.

## MUI

You can use MUI for the design elements.

## Language

The website should detect the language of the browser/device and load on that language. The fallback is English. In the beginning it should have two languages: English and Hungarian.

## Dark mode

The website should have a dark mode option, which can be turned on and off or depending on the system settings.

## Header

### Color of the header

It can be one of the 7 colors of the rainbow: Red, Orange, Yellow, Green, Blue, Indigo, and Violet.
The default should be Violet which can be changed in the Settings

### Menu

Starting with a hamburger icon, which opens the menu.
The menu is open on wide screens (desktop mode).
MUI Drawer is OK as menu.
The menu contains:

- Gratitude Journal
- Prayer List
- Settings

### Title

Simply the name of the currently open menu

### User's head icon

There should be a small icon in the top right corner of the header, which is the user's head icon. If the user is logged in, the icon should be the user's profile picture. If the user is not logged in, the icon should be a generic user icon. Tapping on it should open a dialog where the user can log in or log out into Google Drive.

The user can use the app without logging in, but then the data will not be synced with Google Drive. If the user is not logged in, the icon should be a generic user icon. If the user is logged in, the icon should be the user's profile picture.

## Pages

### Gratitude Journal

In mobile mode there is a calendar view, where the user can select a date and write what they are grateful on that day.
Under the calendar there is a list of the gratitude entries for that day (what the user has written on that day).

On desktop mode there is the menu on the left and the calendar on the right, and in the middle there is the list of the gratitude entries for that day.

Clicking or taping on a date opens the gratitude entries for that day (not for editing first).
The transparent header of the entries of that day is displayed with a title which is the date and an edit button on the right. If the date is today, it will present "today" after the date. The green Edit button contains the word "Edit" and a bird feather (writing tool) icon.
Under the header there is a list of the gratitude entries for that day without the editing tools yet.

By clicking on the Edit button the button disappears and arrow back icon appears at the left side of the title (which is the date).
On mobile, in Edit mode the calendar disappears.

The entries are in one editor box (no separate editing for each entry), where the user can write what they are grateful on that day. The text can be edited in a simple WYSIWYG editor with limited formatting options like bold, italic, underline, and bullet points.

The text is saved as the person types it, but especially if the user leaves the page or closes the browser, the text is saved.

### Prayer List

The prayer list is a list of prayers that the user can add to the prayer list.
It will work similarly to a shopping list, where the user can add items to the list and remove items from the list. The list items are simple text entries with checkboxes. I want it to work like the [Google Keep](https://keep.google.com/) app, where the user can add items to the list and remove items from the list.
By tapping on the checkbox the item will be archived. The delete button will delete the item from the list. The delete button will be hidden by default and will only be visible when the user taps on the item (just like in Google Keep)
The user can set the order just like in Google Keep.

Where the checkbox is selected, the item is archived and will be hidden by default, but can be shown in a separate list by tapping on a button "Show archived items". On that list the user can unarchive the items by tapping on the checkbox but can also edit and delete them.
An arrow back button will be displayed on the top left corner of the archived list, which will take the user back to the main prayer list.

### Settings

The settings page is a simple page with a list of settings. The settings are:

- Language
- Dark mode
- Header color
- Export data
- Import data
- Deleting all data (with a confirmation dialog)

## PWA

The app should be a PWA and should work offline. It should also have a service worker that can be used to cache the app and its data.

## Tech stack

- React
- TypeScript
- MUI
- Vite
- Workbox

## Design

- The app should have a clean and modern design.
- It should be responsive and work on all devices.
- It should be easy to use and navigate.
- It should have a dark mode option.
- It should have a header color option.

## Google Drive integration

It should be possible to use Google Drive to sync the data. If possible the user could log in with their Google account and the app could use their Google Drive to store the data.
The entries and prayers should have timestamps and the app should use the timestamps to sync the data. The app should use the timestamps to determine which data is newer and which data is older and should sync the data accordingly.

## Local storage

The app should also work offline and should use local storage to store the data. The data should be synced with Google Drive when the user is online.