import { describe, expect, it } from 'vitest'
import { computeFragmentLimits } from '../../prompts/loaders/fragmentation'

describe('computeFragmentLimits', () => {
  it('returns target=1 for very short entries', () => {
    expect(computeFragmentLimits(10).target).toBe(1)
    expect(computeFragmentLimits(50).target).toBe(1)
    expect(computeFragmentLimits(74).target).toBe(1)
  })

  it('returns target=1 for entries up to 224 words', () => {
    // round(75/150)=round(0.5)=0 -> max(1,0)=1
    // round(150/150)=1
    // round(224/150)=round(1.49)=1
    expect(computeFragmentLimits(75).target).toBe(1)
    expect(computeFragmentLimits(150).target).toBe(1)
    expect(computeFragmentLimits(224).target).toBe(1)
  })

  it('returns target=2 at the 225-word boundary', () => {
    // round(225/150)=round(1.5)=2
    expect(computeFragmentLimits(225).target).toBe(2)
    expect(computeFragmentLimits(300).target).toBe(2)
  })

  it('returns target=3 around 375-524 words', () => {
    expect(computeFragmentLimits(375).target).toBe(3)
    expect(computeFragmentLimits(450).target).toBe(3)
  })

  it('caps target at 30 for very large entries', () => {
    expect(computeFragmentLimits(5000).target).toBe(30)
    expect(computeFragmentLimits(10000).target).toBe(30)
  })

  it('ceiling is always target + 5', () => {
    expect(computeFragmentLimits(50).ceiling).toBe(6) // 1+5
    expect(computeFragmentLimits(300).ceiling).toBe(7) // 2+5
    expect(computeFragmentLimits(450).ceiling).toBe(8) // 3+5
    expect(computeFragmentLimits(10000).ceiling).toBe(35) // 30+5
  })

  it('never returns target below 1', () => {
    expect(computeFragmentLimits(0).target).toBe(1)
    expect(computeFragmentLimits(1).target).toBe(1)
  })
})
