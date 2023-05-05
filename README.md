# Tubes3_ChitChat_BE
Back End Tubes 3 IF2211 Strategi Algoritma

## Overview

This is a Web application implementing of chatbox (Simple ChatGPT) on string matching by applying simple QA approach using Knuth-Morris-Pratt (KMP) and Boyer-Moore (BM) algorithm. 

The application search for questions that are most similar to the questions given by users is done by string matching algorithms `Knuth-Morris-Pratt (KMP)` and `Boyer-Moore (BM)`. Regex is used to define the format of the query. If none of the questions in the database match the exact match with the user's question via the KMP or BM algorithm, then use the most similar question with at least 90% similarity. If there are no questions that are more than 90% similar, then the chatbot will provide a maximum of 3 choices of the most similar questions for the user to choose from. The application use `Levenshtein Distance Algorithm` to calculate the level of similarity.

[![enigmaze.png](https://i.postimg.cc/mgfMrkJx/img.png)](https://postimg.cc/YhRjnrt8)

## Aplication Feature

- Text question feature (obtained from database)
- Calculator feature
- Date feature
- Add questions and answers to the database
- Delete questions from database

## How To Use

1. Download the [`bin`](https://github.com/noelsimbolon/Tubes2_enigmaze/tree/main/bin) folder
2. Extract everything to a single directory
3. Run `Enigmaze.UI.exe`
4. Click <kbd>Open Maze</kbd> to open a `.txt` file
5. Select an algorithm (BFS/DFS) by clicking on one of the radio buttons
6. Check the `Go Back to Start` checkbox if you want the algorithm to find a path to go back to the starting node after collecting all of the treasures
7. Determine the step interval which is the interval between checking nodes in the visualization, by default it's `100 ms`
8. Click <kbd>Start</kbd> to start the path-finding algorithm and visualization

## Dependencies and Prerequisites

- [Node JS](https://nodejs.org/en) - This is required for backend.

- [React](https://react.dev/) - This is required for frontend.

- [MySQL](https://www.nuget.org/packages/Microsoft.NET.Test.Sdk/) - This is required for database.


## Directory Structure

```
├───doc     # contains report for this application
├───src     # contains source code for the application
```

## How To Run

- Setup database
    - Jalankan command berikut pada MySQL server anda untuk membuat database, user dan memberikan priviledge
      ```sql
      CREATE DATABASE tubes3stima;
      CREATE USER 'stima'@'127.0.0.1' IDENTIFIED BY 'fFDzwk4Z!FpU_QU';
      GRANT ALL PRIVILEGES ON tubes3stima.* TO 'stima'@'127.0.0.1' WITH GRANT OPTION;
      ```
- Cara menjalankan Backend program:
    - Pindah ke directory src
      ```
      cd src
      ```
    - Jalankan program
      ```
      node main.js
      ```
- Cara menjalankan Frontend program:
    - Pindah ke directory frontend
      ```
      cd src
      ```
    - Install semua dependencies:
      ```sh
      npm run dev 
      ```

## Author

| Name                   | GitHub                                            |
|------------------------|---------------------------------------------------|
| Alex Sander            | [maximatey](https://github.com/maximatey)   |
| Muhammad Fadhil Amri   | [Mehmed13](https://github.com/Mehmed13)           |
| Austin Gabriel Pardosi | [AustinPardosi](https://github.com/AustinPardosi) |