import Image from 'next/image';

type PhoneShowcaseProps = {
  className?: string;
  priority?: boolean;
  sizes?: string;
};

export default function PhoneShowcase({
  className = '',
  priority = false,
  sizes = '(max-width: 720px) 250px, (max-width: 1080px) 310px, 360px',
}: PhoneShowcaseProps) {
  const showcaseClassName = ['phone-showcase', className].filter(Boolean).join(' ');

  return (
    <div className={showcaseClassName}>
      <div className="phone-showcase-figure">
        <Image
          alt="Vitality Score app preview on phone"
          className="phone-showcase-image"
          height={1402}
          priority={priority}
          sizes={sizes}
          src="/images/t_shots_phone.png"
          width={1122}
        />
      </div>
    </div>
  );
}
