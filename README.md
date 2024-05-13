Run the following command on the root folder:

npm install
npm run dev => to start the next js development server

<!-- if got any error regarding prisma then run the following command and restart the server -->

npx prisma generate
npx prisma db push

now run the backend server to serve one upload api :

=> go to the server folder 
=> npm install 
=> npm start

<!-- routes: -->

home => /
login => /login
signup => /signup
imagelist => /imagelist
imageupload => /imageupload