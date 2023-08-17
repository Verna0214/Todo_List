Todo List
===
*建立屬於自己的 Todo List*

## Screenshots
- Login
![login.png](https://i.postimg.cc/MTWzjBfK/2023-08-17-4-36-38.png)

- Register
![register.png](https://i.postimg.cc/MHLw4rPv/2023-08-17-4-37-11.png)

- Index
![index.png](https://i.postimg.cc/KzJx7Yt7/2023-08-17-4-36-50.png)

- Create
![create.png](https://i.postimg.cc/5yy1sMmh/2023-08-17-4-36-58.png)

## Prerequisites
- express @4.18.2
- express-handlebars @3.0.0
- font-awesome @4.7.0
- method-override @3.0.0
- mongoose @7.4.2
- dotenv @16.3.1
- bcryptjs @2.4.3
- connect-flash @0.1.1
- passport @0.6.0
- passport-facebook @3.0.0
- passport-local @1.0.0

## User Seed
- Name: root
- Email: root@example.com
- Password: 12345678

## Installation
1. 下載本專案
```
git clone
```
2. 進入專案資料夾
```
cd Todo_List
```
3. 專案初始化
```
npm init -y
```
4. 下載相關套件
```
npm i (related modules)
```
5. 設定環境變數
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.sgwv8lr.mongodb.net/todo_list?retryWrites=true&w=majority
```
6. 下載種子資料
```
npm run seed
```
7. 啟動伺服器
```
npm run dev
```

## Features
- 使用者可以註冊一筆新的帳號資料。
- 使用者可以登入已註冊的帳號資料。
- 使用者可以使用 Facebook 帳號登入。
- 使用者可以在首頁瀏覽自己的 todo list。
- 使用者可以點選 Detail 查看任一筆 todo list 的詳細內容。
- 使用者可以點選 Create 新增任一筆 todo list 的詳細內容。
- 使用者可以點選 Edit 編輯任一筆 todo list 的詳細內容。
- 使用者可以點選 Delete 刪除任一筆 todo list 的資料。

## Development Environment
- Visual Studio Code @1.81.0

## Author
**Verna Chen**