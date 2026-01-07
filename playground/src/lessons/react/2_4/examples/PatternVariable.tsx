// @ts-nocheck
function DataDisplay() {
  let content;

  if (isLoading) {
    content = <Spinner />;
  } else if (hasError) {
    content = <Error />;
  } else if (hasData) {
    content = <DataList />;
  } else {
    content = <Empty />;
  }

  return <div>{content}</div>;
}
