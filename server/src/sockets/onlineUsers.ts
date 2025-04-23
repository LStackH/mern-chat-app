export interface OnlineUser {
  id: string;
  username: string;
}

const userCounts = new Map<string, { username: string; count: number }>();

export function addOnlineUser(user: OnlineUser) {
  const prev = userCounts.get(user.id);
  if (prev) {
    prev.count++;
  } else {
    userCounts.set(user.id, { username: user.username, count: 1 });
  }
}

export function removeOnlineUser(userId: string) {
  const prev = userCounts.get(userId);
  if (!prev) return;
  if (prev.count <= 1) {
    userCounts.delete(userId);
  } else {
    prev.count--;
  }
}

export function getOnlineUsers(): OnlineUser[] {
  return Array.from(userCounts.entries()).map(([id, { username }]) => ({
    id,
    username,
  }));
}
