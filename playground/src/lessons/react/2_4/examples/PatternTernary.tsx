// @ts-nocheck
function DataDisplay() {
  return (
    <div>{isLoading ? <Spinner /> : hasError ? <Error /> : hasData ? <DataList /> : <Empty />}</div>
  );
}
