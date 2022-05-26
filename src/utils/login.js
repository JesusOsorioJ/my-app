import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  setPersistence,
  browserSessionPersistence,
  updateProfile,
  revokeRefreshTokens
} from "firebase/auth";

export async function createAccount(email, password) {
  let auth = getAuth();
  await setPersistence(auth, browserSessionPersistence);
  try {
    const userCredential = createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = await userCredential.user;  
    console.log("user", user);
  } catch (error) {
    console.log("error", error)
  }
}

export async function loginAccount(email, password, name, rol ) {
  const auth = getAuth();
  
    await setPersistence(auth, browserSessionPersistence);
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    if (!(name==="0" || rol==="0")){
    await updateProfile(auth.currentUser, {displayName: name, photoURL: rol })
    }
    const user = userCredential.user;
    console.log("user", user);
  
}

export function logOutAccount(uid){
  getAuth().revokeRefreshTokens(uid)
  .then(() => {
    return getAuth().getUser(uid);
  })
  .then((userRecord) => {
    return new Date(userRecord.tokensValidAfterTime).getTime() / 1000;
  })
  .then((timestamp) => {
    console.log(`Tokens revoked at: ${timestamp}`);
  });
}




