/**
 * Represents a simple Shopify cart
 * 
 * No external dependencies, no additional requirements
 * Just plug n play
 * 
 * @class
 */
class ShopifyCart {

  /**
   * Creates an instance of the cart
   * @constructor
   * @param {Object} logging - Set up logging
   * @param {Boolean} logging.arguments - Output arguments passed to each method
   * @param {Boolean} logging.errors - Log errors to the console
   * @param {Boolean} logging.responses - Log API responses
   */
  constructor(logging) {
    this.logging = {
      arguments: logging.arguments ?? false,
      errors: logging.errors ?? false,
      responses: logging.responses ?? false,
    };
  }

  /**
   * Logs arguments passed to a function
   * @param {Object} obj
   * @private 
   */
  _logArgumentsObject(obj) {
    this.logging.arguments && console.dir(obj);
  }

  /**
   * Logs errors that may occur
   * @param {Object} obj
   * @private 
   */
  _logErrorsObject(obj) {
    this.logging.errors && console.error(obj);
  }

  /**
   * Logs Shopify API responses
   * @param {Object} obj
   * @private 
   */
  _logResponsesObject(obj) {
    this.logging.responses && console.dir(obj);
  }

  /** Adds an item to the cart
   *  @param {Number} variant_id
   *  @param {Number} [quantity] - Quantity of variant to be added.
   *  @param {Object.<string,string>} [line_item_properties] - Key-value pairs of line item properties
   *  @param {Number} [selling_plan] - ID of selling plan
   *  @returns {Promise} - Returns API response
   */
  async addItem(variant_id, quantity = 1, line_item_properties, selling_plan) {
    this._logArgumentsObject({
      function: 'addItem',
      arguments: {
        variant_id,
        quantity,
        line_item_properties,
        selling_plan,
      },
    });

    const item = { id: variant_id, quantity };

    line_item_properties && (item.line_item_properties = line_item_properties);
    selling_plan && (item.selling_plan = selling_plan);

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [item],
        }),
      });

      const response_body = await response.json();

      this._logResponsesObject({
        function: 'addItem',
        response: response_body,
      });
      return response_body;
    } catch (error) {
      this._logErrorsObject(error.message);
      throw Error('Could not complete action. Please see logs for details');
    }
  }

  /** Modifies quantity of a line item using line_item_key
   * @param {String} line_item_key
   * @param {Number} quantity - New quantity
   * @param {Object.<string,string>} [line_item_properties] - Key-value pairs of line item properties
   * @param {Number} [selling_plan] - ID of selling plan
   * @returns {Promise} - Returns API response
   */
  async modifyCartItemByKey(
    line_item_key,
    quantity,
    line_item_properties,
    selling_plan
  ) {
    this._logArgumentsObject({
      function: 'modifyCartItemByKey',
      arguments: {
        line_item_key,
        quantity,
        line_item_properties,
        selling_plan,
      },
    });

    const body = {
      id: line_item_key,
      quantity,
    };

    line_item_properties & (body.line_item_properties = line_item_properties);
    selling_plan & (body.selling_plan = selling_plan);

    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const response_body = await response.json();

      this._logResponsesObject({
        function: 'modifyCartItemByKey',
        response: response_body,
      });
      return response_body;
    } catch (error) {
      this._logErrorsObject(error.message);
      throw Error('Could not complete action. Please see logs for details');
    }
  }

  /** Modifies quantity of a line item based on 1-based index position of the item in the cart
   * @param {Number} index - 1-based index of item in cart
   * @param {Number} quantity - Updated quantity
   * @param {Object.<string,string>} [line_item_properties] - Key-value pairs of line item properties
   * @param {Number} [selling_plan] - ID of selling plan
   * @returns {Promise} - Returns API response
   */
  async modifyCartItemByIndex(
    index,
    quantity,
    line_item_properties,
    selling_plan
  ) {
    this._logArgumentsObject({
      function: 'modifyCartItemByIndex',
      arguments: {
        index,
        quantity,
        line_item_properties,
        selling_plan,
      },
    });

    const body = {
      line: index,
      quantity,
    };

    line_item_properties & (body.line_item_properties = line_item_properties);
    selling_plan & (body.selling_plan = selling_plan);

    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const response_body = await response.json();

      this._logResponsesObject({
        function: 'modifyCartItemByIndex',
        response: response_body,
      });

      return response_body;
    } catch (error) {
      this._logErrorsObject(error.message);
      throw Error('Could not complete action. Please see logs for details');
    }
  }

  /** Modifies quantity of a line item based on variant id
   * @param {String} variant_id - Variant ID of item in cart
   * @param {Number} quantity - New quantity of item
   * @param {Object.<string,string>} line_item_properties - Properties of the cart item
   * @param {Number}
   */
  async modifyCartItemByID(
    variant_id,
    quantity,
    line_item_properties,
    selling_plan
  ) {
    this._logArgumentsObject({
      function: 'modifyCartItemByID',
      arguments: {
        variant_id,
        quantity,
        line_item_properties,
        selling_plan,
      },
    });

    const body = {
      id: variant_id,
      quantity,
    };

    line_item_properties & (body.line_item_properties = line_item_properties);
    selling_plan & (body.selling_plan = selling_plan);

    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const response_body = await response.json();

      this._logResponsesObject({
        function: 'modifyCartItemByID',
        response: response_body,
      });

      return response_body;
    } catch (error) {
      this._logErrorsObject(error.message);

      throw Error('Could not complete action. Please see logs for details');
    }
  }

  /**
   * Fetches cart
   * @returns {Object} Contents of cart
   */
  async getCart() {
    try {
      const response = await fetch('/cart.js');
      const response_body = await response.json();

      this._logResponsesObject({
        function: 'getCart',
        response: response_body,
      });

      return response_body;
    } catch (error) {
      this._logErrorsObject(error.message);

      throw Error('Could not complete action. Please see logs for details');
    }
  }

  /**
   *  Update the cart note and attributes
   *  @param {String} note - Cart note. Pass undefined if want to leave as is
   *  @param {Object.<string,string>} attributes - Cart attributes. Pass undefined if want to leave as is
   *  @returns {Promise} - Returns API response
   */
  async updateCart(note, attributes) {
    this._logArgumentsObject({
      function: 'updateCart',
      arguments: {
        note,
        attributes,
      },
    });

    const body = {};
    note != undefined && (body.note = note);
    attributes && (body.attributes = attributes);

    try {
      const response = await fetch('/cart/update.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const response_body = await response.json();

      this._logResponsesObject({
        function: 'updateCart',
        response: response_body,
      });

      return response_body;
    } catch (error) {
      this._logErrorsObject(error.message);

      throw Error('Could not complete action. Please see logs for details');
    }
  }

  /**
   * Remove all items from cart
   * @returns {Promise} - Returns API response
   */
  async clearCart() {
    try {
      const response = await fetch('/cart/clear.js');
      const response_body = await response.json();

      this._logResponsesObject({
        function: 'clearCart',
        response: response_body,
      });

      return response_body;
    } catch (error) {
      this._logErrorsObject(error.message);

      throw Error('Could not complete action. Please see logs for details');
    }
  }

  /**
   * Generates shipping rates
   * Use the getShippingRates function to retrieve rates once calculations are complete
   * @param {String} zip
   * @param {String} country
   * @param {String} province
   * @returns {Promise} - Returns API response
   */
  async generateShippingRates(zip, country, province) {
    this._logArgumentsObject({
      function: 'generateShippingRates',
      arguments: { zip, country, province },
    });

    try {
      const response = await fetch(
        `/cart/prepare_shipping_rates.json?shipping_address[zip]=${zip}&shipping_address[country]=${country}&shipping_address[province]=${province}`,
        { method: 'POST' }
      );

      const response_body = await response.json();

      this._logResponsesObject({
        function: 'generateShippingRates',
        response: response_body,
      });

      return response_body;
    } catch (error) {
      this._logErrorsObject(error.message);

      throw Error('Could not complete action. Please see logs for details');
    }
  }

  /**
   * Get shipping rates
   * Use the generateShippingRates function to calculate the rates
   * @param {String} zip
   * @param {String} country
   * @param {String} province
   * @returns {Promise} - Returns API response
   */
  async getShippingRates(zip, country, province) {
    this._logArgumentsObject({
      function: 'getShippingRates',
      arguments: { zip, country, province },
    });

    try {
      const response = await fetch(
        `/cart/async_shipping_rates.json?shipping_address[zip]=${zip}&shipping_address[country]=${country}&shipping_address[province]=${province}`
      );

      const response_body = await response.json();

      this._logResponsesObject({
        function: 'generateShippingRates',
        response: response_body,
      });

      return response_body;
    } catch (error) {
      this._logErrorsObject(error.message);

      throw Error('Could not complete action. Please see logs for details');
    }
  }
}
