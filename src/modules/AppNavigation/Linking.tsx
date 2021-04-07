import { LinkingOptions, PathConfigMap } from "@react-navigation/native";

const screens: PathConfigMap = {
  ResetPassword: {
    path: "auth/reset-password",
    parse: {
      // TODO: Need to check this + sign becomes empty 
      Token: (Token: string) => `${Token.replace(/ /g, "+")}`,
      Id: (Id: string) => `${Id}`
    },
  },
}

const config = {
  screens: screens,
};

const linking: LinkingOptions = {
  prefixes: ["https://staging.app.yoma.africa/"],
  config,
};

export default linking;