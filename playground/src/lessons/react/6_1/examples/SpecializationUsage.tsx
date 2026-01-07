// @ts-nocheck
<>
  // Without specialization - verbose, repetitive
  <Button variant="success" icon={<CheckIcon />}>
    Save Changes
  </Button>
  <Button variant="error" icon={<XIcon />}>
    Delete
  </Button>
  // With specialization - clean, semantic
  <SuccessButton>Save Changes</SuccessButton>
  <DangerButton>Delete</DangerButton>
</>;
