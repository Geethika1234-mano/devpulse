import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut,
  browserLocalPersistence,
  setPersistence,
} from "firebase/auth";

// ✅ Correct Firebase config (storageBucket fixed)
const firebaseConfig = {
  apiKey: "AIzaSyAqB_vHxdL5iVC3TXfxWIFCP2VfpcI_hRY",
  authDomain: "devpulse-7e76a.firebaseapp.com",
  projectId: "devpulse-7e76a",
  storageBucket: "devpulse-7e76a.appspot.com",
  messagingSenderId: "79643748147",
  appId: "1:79643748147:web:049935aa069f53993ec046",
  measurementId: "G-SVZMNGT9FC",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// ✅ Set up GitHub provider (single definition)
export const githubProvider = new GithubAuthProvider();
githubProvider.addScope("read:user");
githubProvider.addScope("repo"); // gives private repo access

// ✅ Sign in with popup and persist session
export async function signInWithGithubPopup() {
  await setPersistence(auth, browserLocalPersistence);
  const res = await signInWithPopup(auth, githubProvider);
  console.log("GitHub sign-in result:", res);
  // Only one token declaration
  const cred = GithubAuthProvider.credentialFromResult(res);
  const token = cred?.accessToken || null;
  return { user: res.user, token };
}

// ✅ Sign out
export function signOutFirebase() {
  return signOut(auth);
}
