export default function DogCard({ dog }: { dog: any }) {
  return (
    <div className="bg-gray-100 p-3 w-40 h-50 rounded-lg flex flex-col justify-between">
      <h3 className="text-lg font-bold">Dog name</h3>
      <p className="text-black w-10">Breed:</p>
      <p className="text-black w-10">Age:</p>
      <button className="mt-2 bg-amber-500 text-white py-1 px-3 rounded">
        View Details
      </button>
    </div>
  );
}
