import { environment } from '../env';
import * as mockAuth from './auth';
import * as mockItems from './items';
// You will create these files to house the real Firebase services
import * as firebaseAuth from './firebaseAuth';
// import * as firebaseItems from './firebaseItems';

const auth = environment.useMocks ? mockAuth : firebaseAuth;
const items = environment.useMocks ? mockItems : {}; // firebaseItems;

export { auth, items };