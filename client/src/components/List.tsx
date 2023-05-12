import { Component, KeyboardEvent } from 'react';

type ListProps = {
  items: Array<{ id: string; value: string; data?: any }>;
  onItemClick: (item: { id: string; value: string }) => void;
  listedItem?: boolean;
  listStyle?: string;
  itemStyle?: string;
};

type ListState = {
  selectedIndex: number;
};

class List extends Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  handleKeyDown = (event: KeyboardEvent) => {
    const { selectedIndex } = this.state;
    const { items } = this.props;

    if (event.key === 'ArrowUp' && selectedIndex > 0) {
      this.setState({ selectedIndex: selectedIndex - 1 });
      this.handleItemClick(items[selectedIndex - 1], selectedIndex - 1);
    } else if (event.key === 'ArrowDown' && selectedIndex < items.length - 1) {
      this.setState({ selectedIndex: selectedIndex + 1 });
      this.handleItemClick(items[selectedIndex + 1], selectedIndex + 1);
    }
  };

  handleItemClick = (item: { id: string; value: string }, index: number): any => {
    const { onItemClick } = this.props;
    onItemClick(item);
    this.setState({ selectedIndex: index });
  };

  render() {
    const { items } = this.props;
    const { selectedIndex } = this.state;
    const { listedItem } = this.props;
    const { listStyle } = this.props;
    const { itemStyle } = this.props;

    return (
      <ul onKeyDown={this.handleKeyDown} tabIndex={0} className={`${listStyle}`}>
        {items.map((item, index) => (
          <li
            key={index}
            className={index === selectedIndex ? `selected ${itemStyle}` : `${itemStyle}`}
            onClick={() => this.handleItemClick(item, index)}
          >
            {listedItem ? `${item.id}. ${item.value}` : item.value}
          </li>
        ))}
      </ul>
    );
  }
}

export default List;
