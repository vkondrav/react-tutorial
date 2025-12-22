import { HiCheck } from 'react-icons/hi';

export default function TakeawayList({ items }) {
  return (
    <ul className="list-none p-0 m-0 flex flex-col gap-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3 text-base-content/80 leading-relaxed">
          <span className="flex items-center justify-center w-6 h-6 bg-success rounded-full text-xs shrink-0 text-white">
            <HiCheck />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}
