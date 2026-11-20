export async function SlowComponent() {
    await new Promise((resolve) => setTimeout(resolve, 3000));
  
    return (
      <div className="p-4 border rounded bg-green-50">
        <p className="font-medium">
          Xogtan waxay soo baxday ka dib markii la sugay 3 ilbiriqsi!
        </p>
      </div>
    );
  }