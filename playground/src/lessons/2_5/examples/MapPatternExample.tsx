// @ts-nocheck
{
  users.map((user) => <UserCard key={user.id} user={user} />);
}

// Or inline:
{
  fruits.map((fruit) => <li key={fruit}>{fruit}</li>);
}
