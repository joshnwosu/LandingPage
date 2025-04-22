import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const items = [
  {
    title: 'Is TalentTrace Free?',
    content:
      "Yes, you can try it for free. You won't get access to the latest models and you won't be able to see the entire response on the free version",
  },
  {
    title: 'What platforms and tools are supported?',
    content:
      'We support seamless integration with LinkedIn, Indeed, and GitHub to streamline talent sourcing and profile management. Simply update your preferences on the settings page to select your preferred integration.',
  },
  {
    title: 'Do you have customer support?',
    content:
      'Yes, we provide customer support 24/7 through our email help@talenttrace.com with any questions or concerns.',
  },
];

export default function FAQ() {
  return (
    <div className='relative max-w-full mx-auto'>
      <div className='space-y-4 max-w-[700px] mx-auto py-10 md:py-28'>
        <h2 className='text-4xl tracking-tighter font-geist bg-clip-text text-transparent mx-auto md:text-6xl bg-[linear-gradient(180deg,_#000_0%,_rgba(0,_0,_0,_0.75)_100%)] dark:bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] text-center'>
          Have Questions?
          <br />
          TalentTrace Has Answers
        </h2>
        <Accordion type='single' collapsible className='mt-8'>
          {items.map((item, index) => (
            <AccordionItem
              value={index.toString()}
              key={index.toString()}
              className='py-2'
            >
              <AccordionTrigger className='py-4 text-lg leading-6 hover:no-underline font-light'>
                <span className='flex items-center gap-3'>
                  <span>{item.title}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className='py-4 text-muted-foreground text-lg'>
                {item.content}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
