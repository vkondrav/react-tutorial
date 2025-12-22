export default function TakeawayList({ items }) {
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      {items.map((item, index) => (
        <li
          key={index}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            color: '#cbd5e1',
            lineHeight: 1.6,
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '1.5rem',
              height: '1.5rem',
              backgroundColor: '#22c55e',
              borderRadius: '50%',
              fontSize: '0.75rem',
              flexShrink: 0,
            }}
          >
            ✓
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
