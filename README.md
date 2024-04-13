# React Redux Toolkit E-Commerce App

This is a React-based web application built using Redux Toolkit for state management. It fetches categories and products from an API and allows users to browse products, search by name, and filter by category.

## Features

- Fetch categories and products from API.
- Display products by category.
- Search functionality to filter products by name.
- Responsive design for optimal viewing on various devices.

## Technologies Used

- React: JavaScript library for building user interfaces.
- Redux Toolkit: Simplified Redux state management library.
- TypeScript: Superset of JavaScript that adds static typing.
- Axios: Promise-based HTTP client for making API requests.
- Semantic UI React: UI component library for React.
- PropTypes: Runtime type checking for React props.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/faisalsaeed-work/wego-react-assessment.git

   ```

2. Navigate to the project directory:

   ````bash
   cd wego-react-assessment

3. Install dependencies:

   ```bash
   npm install

4. Start the development server:

    ```bash
    npm start

5. Open http://localhost:3000 to view the app in your browser.

## Usage

- Browse products by clicking on categories or searching by name.
- Use the search bar to filter products by name.

## API Integration

This app integrates with the following API endpoints, which should be defined in your environment configuration:

- `GET $REACT_APP_CATEGORIES_API_URL`: Fetches all available product categories.
- `GET $REACT_APP_RESTAURANT_FOODS_API_URL`: Fetches all products or products filtered by category.

Make sure your environment variables are set correctly to match these specifications for seamless integration.

## Contributing

Contributions are welcome! If you have any suggestions, enhancements, or bug fixes, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Inspiration and guidance from various online tutorials and resources.

## Contact

For any inquiries or feedback, please contact Muhammad Faisal via email at faisalsaeed.work@gmail.com.
