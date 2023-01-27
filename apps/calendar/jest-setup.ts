import "@testing-library/jest-dom";

require('dotenv').config({
  path: '.env.test'
})

jest.mock('./src/helper/getEnvironment', () => ({
  getEnvironment: () => ({ ...firebaseConfig })
}));

const firebaseConfig = {
  apiKey: "AIzaSyDGWCjbEUYbTdxsX8xts0h00QXgPsueXag",
  authDomain: "brocodeappstest.firebaseapp.com",
  projectId: "brocodeappstest",
  storageBucket: "brocodeappstest.appspot.com",
  messagingSenderId: "76677653805",
  appId: "1:76677653805:web:58a36aa5559bc3d25b9fa4"
};
