// import RolesMapping from "../permissions.json";

// JSON format
const Mapping = {
  ADMIN: ['CAN_GET_USER', 'CAN_EDIT_USER'],
  EMPLOYEE: ['CAN_GET_USER'],
  USER: [],
};

export const getPermissionsFromRole = (role) => Mapping[role] || [];
