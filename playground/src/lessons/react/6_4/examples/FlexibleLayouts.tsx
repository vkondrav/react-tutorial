// @ts-nocheck
// Same components, completely different layouts!

<>
  // Layout 1: Image at top
  <Card>
    <Card.Image src="..." alt="..." />
    <Card.Body>Content</Card.Body>
    <Card.Footer>Actions</Card.Footer>
  </Card>
  // Layout 2: Header + Body only
  <Card variant="bordered">
    <Card.Header>Title</Card.Header>
    <Card.Body>Content</Card.Body>
  </Card>
  // Layout 3: Custom order with extra elements
  <Card variant="elevated">
    <Card.Header>
      <CustomTitle />
      <Badge>New</Badge>
    </Card.Header>
    <Card.Image src="..." alt="..." />
    <Card.Body>
      <CustomContent />
    </Card.Body>
    <Card.Footer>
      <PrimaryButton />
      <SecondaryButton />
    </Card.Footer>
  </Card>
</>;
