# Segmentation Blind Evaluation

A simple utility script to evaluate two different segmentation one against the other.

|**Supported Browser** |**Tested** |
|:----------:|:---------:|
|![Edge](https://img.shields.io/badge/Edge-0078D7?style=plain&logo=Microsoft-edge&logoColor=white)| :heavy_check_mark: |
|![Firefox](https://img.shields.io/badge/Firefox-FF7139?style=plain&logo=Firefox-Browser&logoColor=white)| :heavy_check_mark: |
|![Google Chrome](https://img.shields.io/badge/Google%20Chrome-4285F4?style=plain&logo=GoogleChrome&logoColor=white)| :heavy_check_mark: |
|![Safari](https://img.shields.io/badge/Safari-000000?style=plain&logo=Safari&logoColor=white)|:x:|

## Usage

### Prepare the data

The first step is data preparation. Inside the local *data* folder, create three subfolders containing the raw images and the two segmentation to evaluate. We will refer to these folders as images, green and blue.

> :warning: **NOTE:**If you want to evaluate a blind way, ensure to mix the segmentation from the two methods between the green and blue folders!

The images must be in RGBA format; the segmentation labels must have $\alpha$ = 0.

## License

This program is licensed under the MIT "Expat" License.

## Contribution

Any contribution is more than welcome.
Current TODO list:

- Add a nifti loader
- Add functions to change imaeg brightness and contrast
- Improve Zoom Lens
- Improve HTML layout
- Improve Documentation
- Add support for different languages
