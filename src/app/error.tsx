"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <>
      <div className="wrapper">
        <h1>Oops!!! {error.message}</h1>
      </div>
    </>
  );
}