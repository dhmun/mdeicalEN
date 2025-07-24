# North Korea Medical Facilities - Interactive Map

This project generates a dynamic, interactive SVG map visualizing the distribution of medical facilities across North Korea, based on CSV/Excel data. It was created to allow users to intuitively explore and analyze complex hierarchical data.

The core logic is handled by a Python script that processes the source data and generates a complete, self-contained web project (`HTML`, `CSS`, `JavaScript`) powered by a custom SVG map.

## ✨ Key Features

  * **Interactive SVG Map:** Each province is clearly defined and interactive.
  * **Detailed Tooltips:** Hovering over a province displays its name and the total count of medical facilities.
  * **Click-to-Reveal Data Table:** Clicking on a province opens a modal pop-up with a detailed list of all facilities in that region.
  * **Modular Codebase:** A single Python script generates the `HTML`, `CSS`, and `JavaScript` files, ensuring a clean and maintainable project structure.

## 🚀 Live Demo / Preview

*Below is an example of the map in action, showing the drill-down feature when a province is clicked.*

*(It is highly recommended to replace this with a screenshot or GIF of your actual project.)*

## 🛠️ Tech Stack

  * **Data Processing:** Python (Pandas)
  * **Web Framework:** HTML5, CSS3, Vanilla JavaScript (ES6+)
  * **Visualization:** SVG (Scalable Vector Graphics)

## 📂 File Structure

```
/
├── 📄 data.xlsx - 1.csv     # (Required) The source data file
├── 🐍 data_generator.py     # The main Python script that generates the web files
│
├── 🌐 index.html            # (Generated) The main structure of the web page
├── 🎨 style.css             # (Generated) Styles for the page and map
└── ⚙️ script.js             # (Generated) The map's interactive logic
```

## 📖 Usage Guide

### 1\. Prerequisites

You need **Python 3** and the following library installed:

```bash
pip install pandas openpyxl
```

*(openpyxl is required for reading .xlsx files if you choose to use one)*

### 2\. Prepare the Data and SVG

1.  Place your data file (e.g., `data.xlsx - 1.csv`) in the root of the project folder. The file must contain at least the following columns:

      * `Category`
      * `Name` (or `name`)
      * `City` (or `address`)
      * `Nearby facilities`

2.  Open the `data_generator.py` script and paste your **entire SVG code** into the `svg_code` variable.

### 3\. Generate the Web Files

Run the Python script from your terminal to generate the `index.html`, `style.css`, and `script.js` files.

```bash
python data_generator.py
```

### 4\. View the Result (Requires a Live Server)

Due to browser security policies for local files, you **must view the `index.html` file through a local web server.**

1.  Open your terminal in the project folder.

2.  Start Python's built-in web server with the following command:

    ```bash
    python -m http.server
    ```

3.  Open your web browser and navigate to the following address:

    > **http://localhost:8000**

You can now interact with your map and data in the browser.
