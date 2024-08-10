1. Установка Node. Инструкция тут: https://nodejs.org/en/download/package-manager и тут https://github.com/nvm-sh/nvm  
2. Клонируем проект к себе на систему
3. В файле index.ts есть переменная EVERY_X_HOUR -  частота прогона в часах (по умолчанию скрипт будет прогоняться каждые 4 часа, можно поменять это значение, затем сохранить файл)
4. В папке проекта прописываем команды подряд:  
```
npm install
```  
```
npm run build
```
5. Появится папка "build". В нее нужно скопировать (или создать) два файла txt из папки "src": id.txt  и questions.txt
6. Далее в папке build прописываем эти команды подряд:  
```
npm install pm2@latest -g
```  
```
pm2 start index.js
```
7. Для мониторинга можно воспользоваться двумя командами отсюда https://pm2.keymetrics.io/docs/usage/quick-start/ :
```
pm2 logs
```
```
pm2 monit
```
