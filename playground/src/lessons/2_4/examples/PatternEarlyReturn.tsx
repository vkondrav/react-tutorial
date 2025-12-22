// @ts-nocheck
function DataDisplay() {
  if (isLoading) return <Spinner />;
  if (hasError) return <Error />;
  if (!hasData) return <Empty />;

  // Happy path!
  return <DataList />;
}
