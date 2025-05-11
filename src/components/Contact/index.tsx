import { MapPinIcon, PhoneIcon, EnvelopeIcon, UserIcon } from "@heroicons/react/24/outline";

const Contact = () => {
  return (
    <section id="contact" className="overflow-hidden py-16 md:py-20 lg:py-28">
      <div className="container">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl px-4">
            <div className="rounded-sm bg-white px-8 py-11 shadow-three dark:bg-gray-dark sm:p-[55px]">
              <h2 className="mb-8 text-2xl font-bold text-black dark:text-white sm:text-3xl lg:text-2xl xl:text-3xl text-center">
                Contact Us
              </h2>
              
              <div className="mb-8 flex items-center">
                <UserIcon className="mr-4 h-6 w-6 text-primary" />
                <div>
                  <h4 className="text-base font-bold text-black dark:text-white">Team Leader</h4>
                  <p className="text-base text-body-color dark:text-body-color-dark">Xiaohong Zhou</p>
                </div>
              </div>
              
              <div className="mb-8 flex items-center">
                <UserIcon className="mr-4 h-6 w-6 text-primary" />
                <div>
                  <h4 className="text-base font-bold text-black dark:text-white">Database Operation Manager</h4>
                  <p className="text-base text-body-color dark:text-body-color-dark">Xiang Guo</p>
                </div>
              </div>
              
              <div className="mb-8 flex items-center">
                <MapPinIcon className="mr-4 h-6 w-6 text-primary" />
                <div>
                  <h4 className="text-base font-bold text-black dark:text-white">Address</h4>
                  <p className="text-base text-body-color dark:text-body-color-dark">Southern Medical University</p>
                </div>
              </div>
              
              <div className="mb-8 flex items-center">
                <PhoneIcon className="mr-4 h-6 w-6 text-primary" />
                <div>
                  <h4 className="text-base font-bold text-black dark:text-white">Phone</h4>
                  <p className="text-base text-body-color dark:text-body-color-dark">022-61648598</p>
                </div>
              </div>
              
              <div className="mb-8 flex items-center">
                <EnvelopeIcon className="mr-4 h-6 w-6 text-primary" />
                <div>
                  <h4 className="text-base font-bold text-black dark:text-white">E-mail</h4>
                  <p className="text-base text-body-color dark:text-body-color-dark">guoxiang199399@163.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
