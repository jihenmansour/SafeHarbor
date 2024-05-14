import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

const Home = () => {
   
  const loggedIn = {firstName: "Adrian", lastName: "JSM", email: "contact@jsmastery.pro"}

  return (
    <section className='home'>
         <div className='home-content'>
          <header className='home-header'>
            <HeaderBox
              type="greeting"
              title="welcome"
              user={loggedIn?.firstName || "Guset"}
              subtext="Access and manage your account and transactions efficiently"
            />

            <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
            />
          </header>

          RECENT TRANSACTIONS
         </div>

         <RightSidebar
          user={loggedIn} 
          transactions ={[]}
          banks={[{currentBalance: 123.50}, {urrentBalance: 500.50}]}/>
    </section>
  )
}

export default Home