const sinon = require('sinon')
const chai = require('chai')
const expect = chai.expect

const Matrix = require('../libs/Matrix')


describe('Matrix', () => {
  it('should mock the mull_add method', () => {
    const matrix = new Matrix(3)
    const mockMullAdd = sinon.mock(matrix)
    
    mockMullAdd
      .expects('mull_add')
      .once()
      .withArgs(0, 1, 2)

    matrix.mull_add(0, 1, 2)
    mockMullAdd.verify()
  })

  it('should mock the exists_wrong_row method', () => {
    const matrix = new Matrix(3)
    const mockExistsWrongRow = sinon.mock(matrix)
    
    mockExistsWrongRow
      .expects('exists_wrong_row')
      .once()
      .returns(true)

    const result = matrix.exists_wrong_row()
    mockExistsWrongRow.verify()
    expect(result).to.be.true
  })

  it('should add rows using a fake', () => {
    const matrix = new Matrix(2)
    const fakeMullAdd = sinon.fake()
    sinon.replace(matrix, 'mull_add', fakeMullAdd)

    matrix.mull_add(0, 1, 2)
    expect(fakeMullAdd.calledOnceWith(0, 1, 2)).to.be.true

    sinon.restore()
  })

  it('should set a specific element using a stub', () => {
    const matrix = new Matrix(2)
    const stubSet = sinon.stub(matrix, 'set')

    matrix.set(0, 1, 42)
    expect(stubSet.calledOnceWith(0, 1, 42)).to.be.true

    stubSet.restore()
  });

  it('should check for a wrong row using a mock', () => {
    const matrix = new Matrix(3)
    const mockExistsWrongRow = sinon.mock(matrix)
    mockExistsWrongRow.expects('exists_wrong_row').once().returns(true)

    const result = matrix.exists_wrong_row()
    expect(result).to.be.true

    mockExistsWrongRow.verify()
  })

  it('should check for a zero row using a stub', () => {
    const matrix = new Matrix(3)
    const stubExistsZeroRow = sinon.stub(matrix, 'exists_zero_row')
    stubExistsZeroRow.returns(true)

    const result = matrix.exists_zero_row()
    expect(result).to.be.true

    stubExistsZeroRow.restore()
  })

  it('should swap rows with nonzero elements using a spy', () => {
    const matrix = new Matrix(3)
    const spySwapWithNonZeroRow = sinon.spy(matrix, 'swap_with_nonzero_row')

    matrix.swap_with_nonzero_row(0)
    expect(spySwapWithNonZeroRow.calledOnceWith(0)).to.be.true

    spySwapWithNonZeroRow.restore()
  })

  it('should not find a wrong row using a mock', () => {
    const matrix = new Matrix(3)
    const mockExistsWrongRow = sinon.mock(matrix)
    mockExistsWrongRow.expects('exists_wrong_row').once().returns(false)

    const result = matrix.exists_wrong_row()
    expect(result).to.be.false

    mockExistsWrongRow.verify()
  })

  it('should add multiple rows using a fake', () => {
    const matrix = new Matrix(2)
    const fakeMullAdd = sinon.fake()
    sinon.replace(matrix, 'mull_add', fakeMullAdd)

    matrix.mull_add(0, 1, 2)
    matrix.mull_add(1, 0, 3)
    expect(fakeMullAdd.callCount).to.equal(2)
    expect(fakeMullAdd.getCall(0).calledWith(0, 1, 2)).to.be.true
    expect(fakeMullAdd.getCall(1).calledWith(1, 0, 3)).to.be.true

    sinon.restore()
  })

  it('should handle matrix swapping using a spy', () => {
    const matrix = new Matrix(3)
    const spySwapWithNonZeroRow = sinon.spy(matrix, 'swap_with_nonzero_row')

    matrix.swap_with_nonzero_row(0)
    matrix.swap_with_nonzero_row(1)
    expect(spySwapWithNonZeroRow.callCount).to.equal(2)
    expect(spySwapWithNonZeroRow.getCall(0).calledWith(0)).to.be.true
    expect(spySwapWithNonZeroRow.getCall(1).calledWith(1)).to.be.true

    spySwapWithNonZeroRow.restore()
  })
})
