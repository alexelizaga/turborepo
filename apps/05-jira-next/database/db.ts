// import mongoose from 'mongoose';

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */

// const mongooConnection = {
//   isConnected: 0
// }

// export const connect = async() => {
//   if (mongooConnection.isConnected) {
//     console.log('We are connected');
//     return;
//   }

//   if (mongoose.connections.length > 0) {
//     mongooConnection.isConnected = mongoose.connections[0].readyState;

//     if (mongooConnection.isConnected === 1) {
//       console.log('Using last connection');
//       return;
//     }

//     await mongoose.disconnect();
//   }

//   await mongoose.connect('....');
//   mongooConnection.isConnected = 1;
//   console.log('MongoDB connected:', '....');
// }

// export const disconnect = async() => {
//   if (!mongooConnection.isConnected) return;
//   await mongoose.disconnect();
//   console.log('MongoDB disconnected:');
// }