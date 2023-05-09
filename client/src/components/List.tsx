import { Component, KeyboardEvent } from 'react';

type ListProps = {
  items: Array<{ id: string; value: string }>;
  onItemClick: (item: { id: string; value: string }) => void;
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

    return (
      <ul onKeyDown={this.handleKeyDown} tabIndex={0}>
        {items.map((item, index) => (
          <li
            key={index}
            className={index === selectedIndex ? 'selected' : ''}
            onClick={() => this.handleItemClick(item, index)}
          >
            {item.value}
          </li>
        ))}
      </ul>
    );
  }
}

export default List;
