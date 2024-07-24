# YouClip

YouClip is a Chrome extension that allows users to bookmark specific timestamps in YouTube videos, making it easier to jump to important moments later.

## Features

- Add bookmarks with descriptions to YouTube videos
- View all bookmarks for the current video
- Play a bookmarked timestamp
- Delete bookmarks

## Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/CharakaMihiranga/YouClip.git
    ```

2. Open Chrome and navigate to `chrome://extensions/`.

3. Enable Developer mode by clicking the toggle switch in the top right corner.

4. Click the "Load unpacked" button and select the directory where you cloned the repository.

## Usage

1. Navigate to a YouTube video.
2. Click on the YouClip extension icon in the Chrome toolbar.
3. Add bookmarks by clicking the bookmark icon in the video player.
4. View your bookmarks, play them, or delete them using the controls next to each bookmark.

## Development

### Project Structure

- `background.js`: Handles background tasks for the extension.
- `content.js`: Interacts with YouTube pages to capture timestamps.
- `popup.js`: Manages the popup interface where users interact with bookmarks.
- `utils.js`: Contains utility functions for the extension.
- `assets/`: Contains images and other assets used in the extension.
- `popup.html`: The HTML file for the extension's popup interface.
- `styles.css`: Contains styles for the popup interface.

### Scripts

- **Add a new bookmark**: Adds a new bookmark to the current YouTube video.
- **View bookmarks**: Displays all bookmarks for the current YouTube video.
- **Play a bookmark**: Jumps to the bookmarked timestamp in the video.
- **Delete a bookmark**: Removes the bookmark from the list.

## Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Screenshots


![Screenshot 2024-07-24 200717](https://github.com/user-attachments/assets/8a25c7b2-9d43-4875-8e97-8353129cd454)

![Screenshot 2024-07-24 200732](https://github.com/user-attachments/assets/505e4b62-9717-48a2-a770-1279720738ef)

![Screenshot 2024-07-24 200754](https://github.com/user-attachments/assets/1e51ad71-9221-49c1-a4f1-5e79888283c1)



---

Enjoy using YouClip! If you like it, please give the repository a star ⭐.
