// @ts-nocheck
// Children can be many things:

<>
  // 1. Text
  <Card>Hello!</Card>
  // 2. Elements
  <Card>
    <h1>Title</h1>
  </Card>
  // 3. Multiple elements
  <Card>
    <h1>Title</h1>
    <p>Description</p>
  </Card>
  // 4. Components
  <Card>
    <UserProfile />
    <UserActions />
  </Card>
  // 5. Mixed content
  <Card>
    Welcome, <strong>{username}</strong>!
  </Card>
</>;
