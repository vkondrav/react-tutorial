// @ts-nocheck
function withLoading<P>(WrappedComponent: ComponentType<P>) {
  return function WithLoadingComponent(props: P & { isLoading?: boolean }) {
    const { isLoading = false, ...restProps } = props;

    if (isLoading) {
      return <Spinner />;
    }

    return <WrappedComponent {...restProps} />;
  };
}

// Usage
const LoadableUserList = withLoading(UserList);

<>
  <LoadableUserList isLoading={true} users={[]} /> // Shows Spinner
  <LoadableUserList isLoading={false} users={data} /> // Shows UserList
</>;
