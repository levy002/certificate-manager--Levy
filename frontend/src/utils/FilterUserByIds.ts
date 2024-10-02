import { UserDto } from "@/generated-sources/typesAndServices";

export default function filterUsersByIds(users: UserDto[], userIds: number[]): UserDto[] {
  const userIdsSet = new Set(userIds.map(id => id.toString()));
  return users.filter(user => userIdsSet.has(user.userId));
}
