# Weather Forecast App

A weather forecast application built with Next.js 14. Get current and forecasted weather for any city using the OpenWeatherMap API.

## Features

- Search weather by city name
- 5-day weather forecast with detailed info
- Temperature, humidity, wind, sunrise/sunset, and more
- Internationalization (Vietnamese/English)
- Responsive design

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up your OpenWeatherMap API key in a `.env.local` file:

   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` - Main application pages and logic
- `components/` - Reusable UI components
- `utils/` - Utility functions

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or any platform supporting Next.js.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
