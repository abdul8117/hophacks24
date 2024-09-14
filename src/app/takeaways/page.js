export default function KeyTakeaways({ onClick }) {
    return (
      <div className="mt-8 p-4">
        <h2 className="text-xl font-semibold mb-2">Key Takeaways</h2>
        <p>
          - You could improve your protein intake by adding more lean meats.
        </p>
        <p>
          - Consider lowering your daily carbohydrate intake.
        </p>
        <p>
          - Increase healthy fat consumption, such as avocados or nuts.
        </p>
        <p
          className="text-blue-500 cursor-pointer underline mt-4"
          onClick={onClick}
        >
          Click here for detailed advice
        </p>
      </div>
    );
  }
  