import { atomWithStorage } from "jotai/utils";

type UserData = {
  token: string;
};

const UserAtom = atomWithStorage<UserData>("token", { token: "" }, undefined, {
  getOnInit: true,
});

export { UserAtom };
