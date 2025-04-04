export default function PostSkeleton() {
  return (
    <div
      style={{
        padding: '1.5rem',
        marginBottom: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        background: '#f5f5f5',
      }}
    >
      <div
        style={{
          height: '20px',
          width: '60%',
          background: '#ddd',
          borderRadius: 4,
          marginBottom: 10,
        }}
      />
      <div
        style={{
          height: '14px',
          width: '40%',
          background: '#e0e0e0',
          marginBottom: 20,
        }}
      />
      <div
        style={{
          height: '16px',
          width: '100%',
          background: '#e0e0e0',
          marginBottom: 8,
        }}
      />
      <div
        style={{
          height: '16px',
          width: '80%',
          background: '#e0e0e0',
          marginBottom: 8,
        }}
      />
      <div style={{ height: '16px', width: '60%', background: '#e0e0e0' }} />
    </div>
  );
}
