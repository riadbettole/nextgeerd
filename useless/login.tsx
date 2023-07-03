import { Auth, Hub } from "aws-amplify";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { CognitoUser } from "@aws-amplify/auth";

interface UserContextType {
  user: CognitoUser | null;
  setUser: Dispatch<SetStateAction<CognitoUser| null>>;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

async function signIn(Username: string, Password: string) {
  try {
    const user = await Auth.signIn(Username, Password);
  } catch (error) {
    console.log("error signing in", error);
  }
}

interface Props {
  children: React.ReactElement;
}

export default function AuthContext({ children }: Props) {
  const [user, setUser] = useState<CognitoUser | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    Hub.listen("auth", () => {
      checkUser();
    });
  }, []);

  async function checkUser() {
    try {
      const amplifyUser = await Auth.currentAuthenticatedUser();
      if (amplifyUser) {
        setUser(amplifyUser);
        console.log("AGENT SNAKE" + user)
        console.log("AGENT SNAKE" + amplifyUser)
      }
    } catch (err) {
        setUser(null);
        console.log(err)
    }
  }

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}


export const useUser = (): UserContextType => useContext(UserContext)