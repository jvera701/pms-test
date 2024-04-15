import { atomWithStorage } from "jotai/utils";
import type { Project } from "../api/api";

type UserData = {
  token: string;
  project: Project | undefined;
};

const UserAtom = atomWithStorage<UserData>(
  "token",
  { token: "", project: undefined },
  undefined,
  {
    getOnInit: true,
  }
);

export { UserAtom };
