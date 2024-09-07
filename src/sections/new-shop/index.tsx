import { ModeToggle } from '@/sections/dashboard/themeSwitcher';
import { LanguageToggle } from '@/sections/dashboard/languageSwitcher';
import ShopForm from './ShopForm'

const Shop = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-end">
                <ModeToggle />
                <LanguageToggle />
            </div>

            <main className="flex flex-1 justify-center items-center p-3">
                <div className="w-full max-w-[1100px] p-4 md:p-5 mx-auto">
                    <ShopForm />
                </div>
            </main>
        </div>
    )
}

export default Shop