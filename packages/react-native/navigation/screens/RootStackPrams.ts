export type RootStackParamList = {
  Lifestyle: undefined;
  Explore: undefined;
  Body: undefined;
  Mind: undefined;
  Breath: undefined;
  Programmes: undefined;
  Profile: undefined;
};

export type LoginStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

export type LifestyleStackParamList = {
  Lifestyle: undefined;
  DiariesDetails: { uuid: string };
};

export type MindStackParamList = {
  Mind: undefined;
  MindDetails: { uuid: string };
};

export type BodyStackParamList = {
  Body: undefined;
  BodyDetails: { uuid: string };
};

export type BreathStackParamList = {
  Breath: undefined;
  BreathDetails: { uuid: string };
};

export type ProgrammeStackParamList = {
  Programmes: undefined;
  ProgrammeDetails: { uuid: string };
};
