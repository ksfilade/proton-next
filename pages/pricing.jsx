import React from 'react'
import SinglePlan from '../components/singlePlan.component'
import Dropdown from '../components/dropdown.component'
class Pricing extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      showPlans: false,
      currency: 'USD',
      symbol: '€',
      pricing: '1',
      plans: [
        {
          title: 'Free',
          price: { "1": 0, "12": 0, "24": 0 },
          description: 'The basic for private and secure communications',
          users: 1,
          storage: '500MB',
          address: 1,
          domain: 0,
          feauters: null,
          prioritySupport: false,
          includeProtonVpn: false
        },
        {
          title: 'Plus',
          price: 0,
          description: 'Full Featured mailbox with advenced protection',
          users: 1,
          storage: '5 GB',
          address: 1,
          domain: 0,
          feauters: 'support folders, labels, filters, auto-replay, IMAP/SMTP and more',
          prioritySupport: false,
          includeProtonVpn: false
        },
        {
          title: 'PROFESSIONAL',
          price: 0,
          description: 'ProtonMail for professionals and businesses ',
          users: 1,
          storage: '5 GB per user',
          address: 1,
          domain: 0,
          feauters: 'Catch all email,multi user menagment,priority support and more',
          prioritySupport: false,
          includeProtonVpn: false
        },
        {
          title: 'Visionary',
          price: 0,
          description: 'ProtonMail for families and small businesses ',
          users: 1,
          storage: '20 GB',
          address: 1,
          domain: 0,
          feauters: 'all features',
          prioritySupport: false,
          includeProtonVpn: true
        },
      ]
    }
  }
  iterate = async () => {
    let res = await this.fetchData(this.state.currency)
    this.state.plans.forEach((element, index, arr) => {
      res.Plans.forEach(el => {
        if (element.title.toLowerCase() === el.Name.toLowerCase()) {
          arr[index].users = el.MaxMembers
          arr[index].price = el.Pricing
          arr[index].address = el.MaxAddresses
          arr[index].domain = el.MaxDomains
        }
      })
    });
    this.setState({
      plans: this.state.plans,
      showPlans: true
    })
  }
  async componentDidMount() {

    await this.fetchData(this.state.currency)
    await this.iterate()
  }
  fetchData = async (currency) => {
    const myHeaders = new Headers();

    myHeaders.append('Content-Type', 'application/json;charset=utf-8');
    myHeaders.append('x-pm-appversion', 'Other');
    myHeaders.append('x-pm-apiversion', '3');
    myHeaders.append('Accept', 'application/vnd.protonmail.v1+json');

    const myInit = {
      method: 'GET',
      headers: myHeaders,
      mode: 'cors',
      cache: 'default'
    };

    const response = await fetch(`https://api.protonmail.ch/payments/plans?${currency}`, myInit)
    const result = response.json();
    return result;
  }
  changeCurrency = (item) => {
    if (item.startsWith('$'))
      this.setState({
        symbol: '$',
        showPlans: false
      }, () => { this.iterate() })
    else if (item.startsWith('€'))
      this.setState({
        symbol: '€',
        showPlans: false
      }, () => { this.iterate() })
    else {
      this.setState({
        symbol: 'CHF',
        showPlans: false
      }, () => { this.iterate() })
    }
  }
  changePricing = (item) => {
    let price = this.state.pricing
    if (item.toLowerCase() == 'monthly')
      price = '1'
    else if (item.toLowerCase() == 'annualy')
      price = '12'
    else
      price = '24'
    this.setState({
      pricing: price
    })
  }
  render() {
    return (
      <div className='pricing'>

        <h3>Plan & Prices</h3>
        <div className='dropdowns'>
          <Dropdown data={['Monthly', 'Annualy', '2 years']} selected={this.changePricing}></Dropdown>
          <Dropdown data={['€ Eur', '$ Dollar', 'CHF']} selected={this.changeCurrency}></Dropdown>
        </div>
        {
          this.state.showPlans &&
          this.state.plans.slice(0, 4).map(el => (
            <SinglePlan key={el.title} data={el} pricing={this.state.pricing} pricing={this.state.pricing} symbol={this.state.symbol}></SinglePlan>
          ))
        }
        {
          !this.state.showPlans && <h1>Loading ...</h1>
        }
      </div>
    )
  }
}
export default Pricing;