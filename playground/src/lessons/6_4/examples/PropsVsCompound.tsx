// @ts-nocheck
// ❌ Props-based: Rigid, limited flexibility
<>
  <Card
    title="My Card"
    subtitle="Description"
    image="/photo.jpg"
    actions={[
      { label: 'Save', onClick: handleSave },
      { label: 'Cancel', onClick: handleCancel },
    ]}
    footer="Footer text"
    showImage={true}
    imagePosition="top"
  />
  // ✅ Compound: Full control, any structure
  <Card>
    <Card.Image src="/photo.jpg" />
    <Card.Body>
      <h3>My Card</h3>
      <p>Description</p>
      {/* Add anything you want! */}
      <MyCustomComponent />
    </Card.Body>
    <Card.Footer>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </Card.Footer>
  </Card>
</>;
