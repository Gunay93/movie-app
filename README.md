# 🎬 Movie App

A modern React Native movie application built with Expo and TypeScript.

## 🚀 Features

### Movies

* Browse popular movies from TMDB API
* View detailed movie information
* Movie poster and overview display
* Release date and rating information

### Search

* Real-time movie search using TMDB Search API
* Debounced search requests
* Empty search state when no results are found

### Favorites

* Add movies to favorites
* Remove movies from favorites
* Favorites persisted with AsyncStorage
* Filter between All Movies and Favorites

### Pagination

* Infinite scrolling
* Automatic loading of next pages
* Loading indicator while fetching more data
* Last page protection

### User Experience

* Pull to refresh
* Loading states
* Empty states
* Responsive UI
* Smooth navigation between screens

### Storage

* AsyncStorage integration
* Persistent favorites across app restarts

### Routing

* Expo Router
* Dynamic movie detail pages
* Deep linking support

## 🛠️ Tech Stack

* React Native
* Expo
* TypeScript
* Expo Router
* AsyncStorage
* TMDB API
* Expo Vector Icons

## 📱 Screens

* Home Screen
* Movie Detail Screen
* Favorites Filter
* Search Results

## 🌐 Live Demo

GitHub Pages: https://gunay93.github.io/movie-app/

## ⚙️ Installation

```bash
git clone https://github.com/Gunay93/movie-app.git
cd movie-app

npm install
npm start
```
### Run on specific platforms

```bash
npm run android
npm run ios
npm run web
```

## 🔑 Environment Variables

Create a `.env` file in the root directory:

```env
EXPO_PUBLIC_TMDB_API_KEY=YOUR_API_KEY
```

Get your API key from https://www.themoviedb.org/