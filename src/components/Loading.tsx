type Props = {
  text?: string;
};

export default function Loading({ text = "Data is loading ..." }: Props) {
  return <p className="flex-1 text-slate-600 text-center m-20">{text}</p>;
}
